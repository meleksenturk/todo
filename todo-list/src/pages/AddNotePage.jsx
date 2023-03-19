import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, message } from "antd"

const AddNotePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const [todos, setTodos] = useState([])
    useEffect(() => {
        const getTodos = async () => {
            const res = await fetch("http://localhost:5000/api/todo/get-all");
            const data = await res.json()
            setTodos(data)
        }
        getTodos();
    }, [])
    
    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/todo/add-todo", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json ; charset=UTF-8" }
            })
            message.success("Todo başarıyla eklendi.")
            form.resetFields();
            setTodos([...todos, {
                _id: Math.random,
                title: values.title,
                desc: values.price
            }])
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>

            <div className='flex justify-center'>
                <Button type="primary" size='large' onClick={showModal}>
                    <span className='md:text-[15px] text-[12px]'>Bir Yapılacak Oluşturmak İçin Lütfen Tıklayınız</span>
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
                    <Form layout='vertical' onFinish={onFinish} form={form} >
                        <Form.Item name="title" label="Yeni Ürün Ekle"
                            rules={[{ required: true, message: "Başlık alanı boş geçilemez." }]}>
                            <Input placeholder='Todo Başlık.' />
                        </Form.Item>
                        <Form.Item name="desc" label="Todo Açıklaması"
                            rules={[{ required: true, message: "Açıklama alanı boş geçilemez" }]}>
                            <Input placeholder='Todo Açıklaması.' />
                        </Form.Item>
                        <Form.Item className='flex justify-end mb-0' >
                            <Button type="primary" htmlType="submit"  >Oluştur</Button>
                        </Form.Item>


                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default AddNotePage