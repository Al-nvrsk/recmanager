import { trpc } from "@/shared/hooks/trpc";
import { authFormField } from "../../model/consts/authFields";
import { regFormField } from "../../model/consts/registrationFields";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { IAuthForm } from "../../model/types/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, registrationSchema } from "validation-schema";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { FormType } from "../../model/types/FormType";
import './AuthForm.scss'
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { getCurrentUser, getSetCurrentUser } from "@/entities/User";
import { getSetTheme } from "@/features/ThemeSwitcher";
import { Language, Theme } from 'common-types'
import { getSetLang } from "@/features/LangSwitcher";

const { Title, Text } = Typography;

export interface AuthFormProps {
    formType: FormType,
    onClose: ()=>void
}

const AuthForm = (props: AuthFormProps) => {
    const { formType, onClose } = props
    const {t} = useTranslation()
    const [error, setError] = useState('')
    const createUser = trpc.createUser.useMutation();
    const authUser = trpc.authUser.useMutation()
    const [currentFormType, setCurrentFormType] = useState<FormType>(formType)
    const setCurrentUser = getSetCurrentUser()
    const setLang = getSetLang()
    const isAuthForm = () => currentFormType === 'auth'

    const setTheme = getSetTheme()
    const user = getCurrentUser()
        
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IAuthForm>({
        mode: 'onChange',
        resolver: zodResolver(isAuthForm() ? authSchema(t) : registrationSchema(t)),
    });
    
    const onSubmit = async (data: IAuthForm) => {
        isAuthForm()
            ? await authUser.mutateAsync(data)
            : await createUser.mutate(data)
    };

    useEffect(() => {
        if (authUser.isError || createUser.isError) {
            return showNetworkError()
        }
        if (authUser.data) {
            setCurrentUser(authUser.data)
            setTheme(authUser.data?.theme?.theme as Theme) // update prisma fo fix type error
            setLang(authUser.data?.lang?.lang as Language)    
            onClose()
        }
        if (createUser.data) {
            setCurrentUser(createUser.data)
            onClose()
        }

    }, [createUser, authUser])


//   const OAuthHandler = async () => {
//     await signinWithYandex();
//   };

    const onChangeFormType = () => {
        reset()
        showNetworkError()
        setCurrentFormType(currentFormType === 'auth'
        ? 'registration'
        : 'auth'
        )
    }

    return (
        <Row justify="center" align="middle" className="auth-page">
            <Col className="auth-page__col">
                <Title level={2} className="auth-page__title">{t(isAuthForm() ? 'Sign in': 'Sign up')}</Title>
                    <Form 
                        size="large"
                        className="auth-page__form" 
                        onFinish={handleSubmit(onSubmit)}
                    >
                        {(isAuthForm() ? authFormField : regFormField).map(authField => (
                            <Form.Item
                                key={authField}
                                validateStatus={errors[authField] ? 'error' : ''}
                                help={errors[authField]?.message}
                            >
                                <Controller
                                    name={authField}
                                    control={control}
                                    render={({ field }) => (
                                        authField.includes('assword') 
                                        ?  <Input.Password {...field} placeholder={`${t(authField)}`} />
                                        : <Input {...field} placeholder={`${t(authField)}`} /> 
                                    )}
                                />
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="auth-page__button"
                                type="primary"
                                disabled={!!Object.keys(errors).length}
                                loading={createUser.isLoading || authUser.isLoading}
                            >
                                {t(isAuthForm()
                                    ? 'Authorization'
                                    : 'Registration'
                                ) }
                            </Button>
                        </Form.Item>
                        {isAuthForm() && 
                        <Form.Item>
                            <Button
                //  onClick={OAuthHandler} htmlType="button" className="auth-page__button"
                            >
                                Войти с Яндекс ID
                            </Button>
                        </Form.Item>
                    }
                </Form>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: 'flex' }}
                >
                    <Button
                        htmlType="button"
                        className="auth-page__button"
                        type={'primary'}
                        danger onClick={onClose}
                    >
                        {t('Cancel') }
                    </Button>
                    <Text 
                        className="auth-page__link"
                        onClick={onChangeFormType}
                    >
                        {t(isAuthForm() 
                            ? "Don't have an account?" 
                            : "Already have an account?"
                        )}
                    </Text>
                </Space>
            </Col>
        </Row>
    );
}

export default AuthForm
