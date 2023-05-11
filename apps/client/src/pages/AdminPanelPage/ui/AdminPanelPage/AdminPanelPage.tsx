import { Button, Table, TableProps } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import cls from './AdminPanelPage.module.scss'
import { useTranslation } from "react-i18next"
import { FilterValue } from "antd/es/table/interface"
import { ColumnsAdminPanel } from "../ColumnsAdminPanel/ColumnsAdminPanel"
import { getSetTableSearchState, tabLocales } from '@/entities/Table';
import { AdminPanelColumnType } from "../../model/types/AdminPanelColumnType"
import { trpc } from "@/shared/hooks/trpc/trpc"
import { UserRole } from "common-files"

const AdminPanelPage = memo(() => {
    const getAllUsers = trpc.getAllUsers.useQuery()
    const {t} = useTranslation()
    const setTableSearch = getSetTableSearchState()
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({})
    const changeUserRole = trpc.changeUserRole.useMutation()
    const deleteUser = trpc.deleteUser.useMutation()
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        if (!getAllUsers.data) {
            return
        }
        getAllUsers.data

    }, [getAllUsers.isFetched])

    const onCleareFilter = useCallback(() => {
        setFilteredInfo({});
        setTableSearch('')
    }, [])

    // @ts-ignore
    const onHandleChange: TableProps<AdminPanelColumnType>['onChange'] = useCallback((pagination, filters, sorter) => {
        setFilteredInfo(filters);
    }, [])

    const onChangeUserRole = useCallback(async(newRole: UserRole, id: string)=> {
        await changeUserRole.mutate({id, role:newRole})
        getAllUsers.refetch()
    }, [])

    const onDeleteUser = useCallback(async(id: string) => {
        await deleteUser.mutateAsync({id})
        getAllUsers.refetch()
    }, [])

    return (
        <div className={cls.AdminPanelPage}>
            <Button 
                    className={cls.clearBtn}
                    htmlType={'button'}
                    type={'default'}
                    onClick={onCleareFilter}
                >
                    {t('Cleare filter')}
            </Button>
            <Table
                className={cls.yourTable}
                rowKey="uid"
                pagination={false}
                columns={ColumnsAdminPanel({
                    filteredInfo,
                    allUserState: getAllUsers.data || [],
                    onChangeUserRole,
                    onDeleteUser
                })}
                dataSource={getAllUsers.data?.map(user => (
                    {key: user.id,
                    ...user}
                ))}
                locale={tabLocales()}
                onChange={onHandleChange}
                size={'small'}
            />
        </div>
    )
})

export default AdminPanelPage
