import { Rating } from "@/entities/Rating";
import { Button, Form, Input, Typography, Col, Select, SelectProps, Rate, Space} from 'antd';
import React from 'react';
import cls from './ReviewsPage.module.scss'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { workType } from "../../model/consts/workTypes";
import { TextEditor } from "@/entities/Editor";
import { useNavigate } from "react-router-dom";
import { getRouteMain, getRouteReviewDetails, getRouteReviews } from "@/shared/const/router";
import { getSetReviewEditState } from "../../model/selectors/getSetReviewEditState";
import { getReviewEditState } from "../../model/selectors/getReviewEditState";
import { formReviewSchema } from "validation-schema";
import { EditReview } from "../../model/types/EditReview";
import { trpc } from "@/shared/hooks/trpc";

export const ReviewEdit = () => {
    const getTags = trpc.getTags.useQuery()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const ReviewEditStateStore = getReviewEditState()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditReview>({
        defaultValues: ReviewEditStateStore,
        mode: 'onChange',
        resolver: zodResolver(formReviewSchema(t)),
    });
    
    const onSubmit = (data: any) => {
        setReviewEditState(data)
        console.log(data);
        navigate(getRouteReviewDetails('preview'))
    };

    const tags = getTags.data?.map(el => (
        { value: el.tag, label: el.tag }
    )) 

    const onCancel = () => {
        navigate(getRouteReviews())
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
            onFinish={handleSubmit(onSubmit)}
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
                <Select
                    {...field}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
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
                style={{ width: '100%' }}
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
                        Preview
                    </Button>

                    <Button 
                        htmlType={'button'}
                        type={'primary'}
                        danger
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </Space>

            </Form.Item>
        </Form>
    );
}
