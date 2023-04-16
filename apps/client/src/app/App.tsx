import * as React from "react";
import "./App.css";
import IndexPage from "../pages/IndexPage";
import { Suspense } from "react";
import { BugButton } from "./providers/ErrorBoundary/ui/ErrorBoundary/BugButton";
import { Col, ConfigProvider, Layout, Space, Switch, theme } from 'antd';
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import AppRouter from "./providers/router/ui/AppRouter";

const { Footer, Content } = Layout;

export const App = () => {

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
                                </div>
                            </Content>
                        </Col>
                    </Layout>
                </Layout>                
            </Suspense>
            </div>
    )
}
