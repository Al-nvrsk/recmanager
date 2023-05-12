import { User, getCurrentUser, getSetCurrentUser } from "@/entities/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Col, Form, Input, Modal, Popover, Row, Space, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import cls from './ProfilePage.module.scss'
import { changeUserSchema } from "common-files";
import { UserOutlined } from "@ant-design/icons";
import {useDropzone} from 'react-dropzone'
import { s3FileUpload } from "@/shared/utils/s3FileUpload";
import { trpc } from "@/shared/hooks/trpc/trpc";

const { Title } = Typography
interface editUser extends Omit<User, 'id' | 'roles' | 'likedNumber' | 'avatar' > {}

const ProfilePage = memo(() => {
    const user = getCurrentUser()
    const {t} = useTranslation()
    const [isEditing, setIsEditing] = useState(false)
    const changeAvatar = trpc.changeAvatar.useMutation()
    const changeUserData = trpc.changeUser.useMutation()
    const getUser = trpc.getUser.useQuery({userId: user!.id, author: false},{enabled: false})
    const setCurrentUser = getSetCurrentUser()

    useEffect(() => {
        if (!getUser?.data) {
            return
        }
            const {theme, lang, ...user} = getUser.data
            setCurrentUser(user)
    }, [getUser.isSuccess])
    

    const onDrop = useCallback((acceptedFiles: Buffer[]) => {
        if (!user) {
            return
        }
        acceptedFiles.forEach(async(file) => {
            const newAvatar = await s3FileUpload(file)
            if (typeof newAvatar !== 'string') {
                return}
            await changeAvatar.mutateAsync({id: user.id, avatar: newAvatar})
            getUser.refetch()
        })
    }, [])
    // @ts-ignore  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const {
            control,
            handleSubmit,
            clearErrors,
            formState: { errors },
            reset
          } = useForm<editUser>({
            defaultValues: {
                firstName: user?.firstName,
                secondName: user?.secondName,
                login: user?.login,
                email: user?.email,
            },
            mode: 'onChange',
            resolver: zodResolver(changeUserSchema(t)),
          });

    const onSubmit = async (data: editUser) => {
        if (!user) {
            return
        }
        const updatedUser = await changeUserData.mutateAsync({id: user.id, ...data})
        getUser.refetch()
        setIsEditing(false)
    }

    const userFields = ['firstName', 'secondName', 'login', 'email']

    const onCancel = useCallback(() => {
        reset()
        setIsEditing(false)
    },[])

    return (
        <div className={cls.ProfilePage}>

            <Popover content={t('Click or drug n drop for update image')} trigger="hover">
               <div {...getRootProps()} style={{margin: '16px auto'}}>
                    <input {...getInputProps()} />
                    <Avatar size={248} src={user?.avatar} icon={<UserOutlined />}  />
                </div>
            </Popover>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{span: 12}}
                layout="horizontal"
                style={{width: '100%'}}
                onFinish={(e) => {
                    clearErrors()
                    handleSubmit(onSubmit)(e)}
                }
            >
            {userFields.map((el)  => (
                <Form.Item 
                key={el}
                label={t(el)}
                validateStatus={errors[el as keyof editUser] ? 'error' : ''}
                help={errors[el as keyof editUser]?.message}
            >
                <Controller
                    name={el as keyof editUser}
                    control={control}
                    render={({ field }) => 
                        <Input 
                            {...field}
                            readOnly={!isEditing}
                            className={!isEditing ? cls.input : ''}
                        />
                    }
                />
            </Form.Item>
                )
            )}
            
            <Form.Item>
                {isEditing
                ? <Space  >

                    <Button 
                        htmlType="submit"
                        type="primary"
                        disabled={!!Object.keys(errors).length}
                        loading={changeUserData.isLoading}
                    >
                        {t('Save')}
                    </Button>

                    <Button 
                        htmlType={'button'}
                        type={'primary'}
                        danger
                        onClick={onCancel}
                    >
                        {t('Cancel')}
                    </Button>
                    </Space>
                : <Button 
                    type={'primary'}
                    onClick={() => setIsEditing(true)}>
                    {t('Edit')}
                </Button>
                }
            </Form.Item>
        </Form>
    </div>
    )
})

export default ProfilePage
