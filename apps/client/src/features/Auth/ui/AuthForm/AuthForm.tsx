import { trpc } from "@/shared/hooks/trpc/trpc";
import { authFormField } from "../../model/consts/authFields";
import { regFormField } from "../../model/consts/registrationFields";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { IAuthForm } from "../../model/types/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FormType } from "../../model/types/FormType";
import './AuthForm.scss'
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { authSchema, registrationSchema } from "common-files";
import { getSetIsLoggedIn } from "@/entities/User";

const { Title, Text } = Typography;

export interface AuthFormProps {
    formType: FormType,
    onClose: ()=>void
}

const AuthForm = (props: AuthFormProps) => {
    const { formType, onClose } = props
    const {t} = useTranslation()
    const createUser = trpc.createUser.useMutation();
    const authUser = trpc.authUser.useMutation()
    const [currentFormType, setCurrentFormType] = useState<FormType>(formType)
    const setIsLoggedIn = getSetIsLoggedIn()
    const isAuthForm = () => currentFormType === 'auth'

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IAuthForm>({
        mode: 'onChange',
        resolver: zodResolver(isAuthForm() ? authSchema(t) : registrationSchema(t)),
    });
    
    const onSubmit = useCallback(async (data: IAuthForm) => {
        isAuthForm()
            ? await authUser.mutateAsync(data)
            : await createUser.mutate(data)
    }, [isAuthForm]);

    useEffect(() => {
        if (!authUser.isSuccess && !createUser.isSuccess) {
            return
        }
        setIsLoggedIn(true)
        onClose()
    }, [authUser.isSuccess, createUser.isSuccess])

    useEffect(() => {
        if (!authUser.isError) { return }
        {showNetworkError(`${t(authUser.error.message)}`) }
    }, [authUser.isError])

    useEffect(() => {
        if (!createUser.isError) { return}
            showNetworkError(`${t(createUser.error.message)}`)
    }, [createUser.isError])

    const onChangeFormType = useCallback(() => {
        reset()
        setCurrentFormType(currentFormType === 'auth'
        ? 'registration'
        : 'auth'
        )
    }, [currentFormType])

    const google = useCallback(() => {
        window.open(`${__SERVER_URL__}/api/auth/google`, "_self");
    }, []);
    
    const github = useCallback(() => {
        window.open(`${__SERVER_URL__}/api/auth/github`, "_self");
    }, []);

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
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{ display: 'flex' }}
                            >
                                <GoogleLoginButton onClick={google} />
                                <GithubLoginButton onClick={github} />
                            </Space>
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

export default  memo(AuthForm)
