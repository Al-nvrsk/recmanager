import { Rating } from "@/entities/Rating";
import { Button, Form, Input, Select, Space} from 'antd';
import React, { memo, useCallback } from 'react';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { TextEditor } from "@/entities/Editor";
import { useNavigate } from "react-router-dom";
import {  getRouteReviewDetails, getRouteReviews } from "@/shared/const/router";
import { getSetReviewEditState } from "../../model/selectors/getSetReviewEditState";
import { getReviewEditState } from "../../model/selectors/getReviewEditState";
import { EditReview } from "../../model/types/EditReview";
import { trpc } from "@/shared/hooks/trpc/trpc";
import { workType } from "@/shared/const/workType";
import { SelectWithFilter } from "@/shared/ui/SelectWithFilter/SelectWithFilter";
import { formReviewSchema } from "common-files";

export const ReviewEdit = memo(() => {
    const getTags = trpc.getTags.useQuery()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const ReviewEditStateStore = getReviewEditState()

    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset
    } = useForm<EditReview>({
        defaultValues: ReviewEditStateStore,
        mode: 'all',
        resolver: zodResolver(formReviewSchema(t)),
    })
    
    const onSubmit = useCallback((data: EditReview) => {
        setReviewEditState(data)
        navigate(getRouteReviewDetails('preview'))
    }, [setReviewEditState, navigate])

    const tags = getTags.data?.map(el => (
        { value: el.value, label: el.value }
    )) 

    const onCancel = useCallback(() => {
        navigate(getRouteReviews())
    }, [navigate])

    return (
        <Form
            labelCol={{ span: 4 }}
            layout="horizontal"
            style={{width: '100%'}}
            onFinish={(e) => {
                clearErrors()
                handleSubmit(onSubmit)(e)}
            }
        >
            <Form.Item 
                label="Review name"
                validateStatus={errors.ReviewName ? 'error' : ''}
                help={errors.ReviewName?.message}
            >
                <Controller
                    name='ReviewName'
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item 
                label="Title of work"
                validateStatus={errors.TitleOfWork ? 'error' : ''}
                help={errors.TitleOfWork?.message}
            >
                <Controller
                    name='TitleOfWork'
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item 
                label="Type of the work"
                validateStatus={errors.TypeOfWork ? 'error' : ''}
                help={errors?.TypeOfWork?.message}
            >
                <Controller 
                    name='TypeOfWork'
                    control={control}
                    render={({ field }) =>
                    <SelectWithFilter 
                        {...field}
                        options={workType()}
                    />
                }
                />
            </Form.Item>
            <Form.Item 
                label="Tags"
                validateStatus={errors.Tags ? 'error' : ''}
                help={errors?.Tags?.message || (Array.isArray(errors.Tags) && errors?.Tags.filter(err => err.message)[0]?.message)}
            >
                <Controller 
                    name='Tags'
                    control={control}
                    render={({ field }) =>
                        <Select
                            {...field}
                            mode="tags"
                            tokenSeparators={[',']}
                            options={tags}
                        />
                    }
                />
            </Form.Item>
            
            <Form.Item 
                label="Rating"
                validateStatus={errors.AuthRating ? 'error' : ''}
                help={errors.AuthRating?.message}
            >
                <Controller 
                    name='AuthRating'
                    control={control}
                    render={({ field }) =>
                        <Rating {...field} />
                    }
                    />
                </Form.Item>
        
            <Form.Item
                validateStatus={errors.ReviewText ? 'error' : ''}
                help={errors.ReviewText?.message}
            >
                <Controller 
                    name='ReviewText'
                    control={control}
                    render={({ field }) =>
                    <TextEditor {...field} placeholder="ReviewText"/>
                    }
                    />
            </Form.Item>

            <Form.Item>
                <Space  >

                    <Button 
                        htmlType="submit"
                        type="primary"
                        disabled={!!Object.keys(errors).length}
                    >
                        {t('Preview')}
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

            </Form.Item>
        </Form>
    );
})
