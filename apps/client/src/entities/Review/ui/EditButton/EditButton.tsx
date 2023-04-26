// import { Button, Space } from "antd"
// import React from "react"
// import { useTranslation } from "react-i18next"
// import { useNavigate } from "react-router-dom"
// import cls from './EditButton.module.scss'
// import { trpc } from "@/shared/hooks/trpc"
// import { getCurrentUser } from "@/entities/User"
// import { getRouteReviewEdit } from "@/shared/const/router"
// import { getReviewEditState } from "@/entities/Editor"

// export const EditButton = () => {
//     const navigate = useNavigate()
//     const {t} = useTranslation()
//     const editedReviewState = getReviewEditState()
//     const createReview = trpc.createReview.useMutation();
//     const author = getCurrentUser()

//     const onSave = async() => {
//         // const createdReview = await createReview.mutateAsync({authorId: author!.id, ...editedReviewState})
//         console.log('review', createdReview)
//     }
    
//     const onEdit = () => {
//         navigate(getRouteReviewEdit('1'))
//     }

//     return (
//         <div className={cls.EditButton}>
//             <Space size={'large'}>
//             { reviewEditState
//                 ? <Button
//                         type={'primary'}
//                         onClick={onSave}
//                         loading = {createReview.isLoading}
//                     >
//                         {t('Save')}
//                     </Button>
//                 : (currentUser?.id === currentReview.authorId) &&
//                     <Button
//                         type={'primary'}
//                         onClick={onEdit}
//                     >
//                         {t('Edit')}
//                     </Button>
//             }
//                 <Button
//                     type={'primary'}
//                     danger
//                     onClick={() => navigate(-1)}
//                 >
//                     {t('Back')}
//                 </Button>
//             </Space>
//         </div>
//     )
// }
