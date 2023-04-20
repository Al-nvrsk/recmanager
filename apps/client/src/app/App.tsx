import * as React from "react";
import "./App.css";
import { Suspense } from "react";
import { Col, ConfigProvider, Layout, Space, Switch, theme } from 'antd';
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import AppRouter from "./providers/router/ui/AppRouter";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localStorege";
import { getSetCurrentUser } from "@/entities/User";
import { Toaster } from "react-hot-toast";

const { Footer, Content } = Layout;

export const App = () => {
    // const setUser = getSetCurrentUser()
    // const currentUser = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    // currentUser && setUser(JSON.parse(currentUser))

    return (
        <div className="app">
        <Suspense fallback="">
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout >
                        <Sidebar />
                        <Col>
                            <Content>
                                <div className="content-page">
                                    <AppRouter />
                                    <Toaster />
                                </div>
                            </Content>
                        </Col>
                    </Layout>
                </Layout>                
            </Suspense>
            </div>
    )
}
