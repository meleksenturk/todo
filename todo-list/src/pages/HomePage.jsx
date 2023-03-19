import React, { useEffect, useState } from 'react'
import { Spin, message, Modal, Form, Input, Button, Card } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
const HomePage = () => {

  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState({});
  
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:5000/api/todo/get-all");
      const data = await res.json()
      setTodos(data)
    }
    getTodos();
  }, [])
  

  const deleteTodo = (todo) => {

    try {
      fetch("http://localhost:5000/api/todo/delete-todo", {
        method: "DELETE",
        body: JSON.stringify(todo),
        headers: { "Content-type": "application/json ; charset=UTF-8" }
      })
      message.success("Todo başarıyla silindi.")

      setTodos(todos.filter((item) => item._id !== todo._id))

    } catch (error) {
      console.log(error)

    }
  }

  const onFinish = (values) => {

    try {
      fetch("http://localhost:5000/api/todo/update-todo", {
        method: "PUT",
        body: JSON.stringify({ ...values, todoId: editingItem._id }),
        headers: { "Content-type": "application/json ; charset=UTF-8" }
      })
      setTodos(
        todos.map((todo) => {
          if (todo._id === editingItem._id) {
            return values;
          }
          return todo;
        }))
      message.success("Todo güncellendi.")
      form.resetFields();
      setIsModalOpen(false)

      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>

      {todos ? (<div className='!grid lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 grid-cols-1 md:gap-5 ml-10 mt-5'>
        {todos && todos.map((item) => (

          <Card
            className='text-black m-3'
            title={item.title}
            bordered={false}
            style={{
              width: 300,

            }}
            key={item._id}
          >
            <div className='flex justify-between items-center'>

              <p>{item.desc}</p>


              <div onClick={() => setEditingItem(item)}>
                <DeleteOutlined className=' hover:text-[#40a9ff] cursor-pointer' onClick={() => deleteTodo(item)} />
                <EditOutlined className=' hover:text-[#40a9ff] cursor-pointer ml-2' onClick={() => setIsModalOpen(true)} />
                <Modal title="Düzenle" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
                  <Form layout='vertical' onFinish={onFinish} form={form} >
                    <Form.Item name="title" label="Başlığı Düzenle"
                      rules={[{ required: true, message: "Başlık alanı boş geçilemez." }]}>
                      <Input placeholder='Todo Başlık.' />
                    </Form.Item>
                    <Form.Item name="desc" label="Todo Açıklaması"
                      rules={[{ required: true, message: "Açıklama alanı boş geçilemez" }]}>
                      <Input placeholder='Todo Açıklaması.' />
                    </Form.Item>
                    <Form.Item className='flex justify-end mb-0' >
                      <Button type="primary" htmlType="submit"  >Düzenle</Button>
                    </Form.Item>


                  </Form>
                </Modal>
              </div>


            </div>
          </Card>
        ))}
      </div>) : <Spin size="large" className="absolute top-1/3 left-1/2"></Spin>}

    </>
  )
}

export default HomePage