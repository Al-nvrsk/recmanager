import * as React from "react";
import "./App.css";
import IndexPage from "../pages/IndexPage";
import { Suspense } from "react";
import { BugButton } from "./providers/ErrorBoundary/ui/ErrorBoundary/BugButton";
import { Col, Layout, Space } from 'antd';
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";

const { Footer, Content } = Layout;

export const App = () => {

    return (
        <div>
            <Suspense fallback="">
                <Layout style={{ minHeight: '100vh' }}>
                    <Header />
                    <Layout >
                        <Sidebar />
                        <Col>
                            <Content>
                                Content
                                <div className="content-page">
                                    aaaaa
                                    <BugButton />
                                    <IndexPage />
                                </div>
                            </Content>
                        </Col>
                    </Layout>
                </Layout>                
            </Suspense>
        </div>
    )
}
