import { trpc } from "@/shared/hooks/trpc";
import { authFormField } from "../../model/consts/authFields";
import { regFormField } from "../../model/consts/registrationFields";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { IAuthForm } from "../../model/types/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, registrationSchema } from "validation-schema";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { FormType } from "../../model/types/FormType";
import './AuthForm.scss'

const { Title, Text } = Typography;

export interface AuthFormProps {
    formType: FormType,
    onClose: ()=>void
}

const AuthForm = (props: AuthFormProps) => {
    const mutation = trpc.createUser.useMutation();
    const { formType, onClose } = props
    const [currentFormType, setCurrentFormType] = useState<FormType>(formType)
    const isAuth = () => currentFormType === 'auth'
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IAuthForm>({
        mode: 'onChange',
        resolver: zodResolver(registrationSchema()),
    });
    
    
    const {t} = useTranslation()
    
   

//   const dispatch = useAppDispatch();

    const onSubmit = async (data: IAuthForm) => {
        // console.log(data)
    // const userCreator = await trpc.createUser.mutation(data)
    mutation.mutate(data)
    // createUser.useMutation().
      // getUser.useQuery({ id: 'id_bilbo' });
    //   const userCreator = trpc.create;


    
    // await signIn(data);
    // dispatch(fetchUser());
    };


//   getUser.useQuery({ id: 'id_bilbo' });
//   const userCreator = trpc.create;



//   const OAuthHandler = async () => {
//     await signinWithYandex();
//   };

    const onChangeFormType = () => {
        reset()
        setCurrentFormType(currentFormType === 'auth'
        ? 'registration'
        : 'auth'
        )
    }

    return (
        <Row justify="center" align="middle" className="auth-page">
            <Col className="auth-page__col">
                <Title level={2} className="auth-page__title">{t(isAuth() ? 'Sign in': 'Sign up')}</Title>
                    <Form 
                        size="large"
                        className="auth-page__form" 
                        onFinish={handleSubmit(onSubmit)}
                    >
                        {(isAuth() ? authFormField : regFormField).map(authField => (
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
                            >
                                {t(isAuth()
                                    ? 'Authorization'
                                    : 'Registration'
                                ) }
                            </Button>
                        </Form.Item>
                        {isAuth() && 
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
                        // to={getRouteMain()}
                    >
                        {t(isAuth() 
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
