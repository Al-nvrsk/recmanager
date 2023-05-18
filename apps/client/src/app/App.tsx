import * as React from "react";
import "./App.css";
import { Suspense, useEffect } from "react";
import { Layout } from 'antd';
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import AppRouter from "./providers/router/ui/AppRouter";
import { getIsLoggedIn, getSetCurrentUser } from "@/entities/User";
import { Toaster } from "react-hot-toast";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { getSetLang } from "@/features/LangSwitcher";
import { getSetTheme } from "@/features/ThemeSwitcher";
import { Language, Theme } from "common-files";
import { isMobile } from "@/shared/const/isMobile";

const { Footer, Content } = Layout;

export const App = () => {
    const getUser = trpc.getUser.useQuery()
    const setCurrentUser = getSetCurrentUser()
    const setLang = getSetLang()
    const setTheme = getSetTheme()
    const isLoggedIn = getIsLoggedIn()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        getUser.refetch()
    }, [isLoggedIn])
    
    useEffect(() => {
        if (getUser?.isSuccess) {
            const {theme, lang, ...user} = getUser.data
            setCurrentUser(user)
            setLang(lang?.lang as Language )
            setTheme(theme?.theme as Theme)
        }
    }, [getUser.fetchStatus])

    return (
        <div className="app">
            <Suspense fallback="">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Header />
                        <Layout >
                            {!isMobile() &&
                            <Sidebar />}
                                <Content>
                                    <div className="content-page">
                                        <AppRouter />
                                        <Toaster />
                                    </div>
                                </Content>
                        </Layout>
                    </Layout>                
                </Suspense>
            </div>
    )
}
