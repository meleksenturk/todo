import React from 'react'
import {
    HomeOutlined,
    SearchOutlined,
    LogoutOutlined,
    FormOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Input } from "antd"
import './header.css'

const Header = () => {

    return (
        <>
            <div className='header'>
                <div className='header-logo '>
                    <img src={"images/todo.PNG"} alt=""></img>
                </div>

                <div className="header-search ">
                    <Input size="large" placeholder="Ara" prefix={<SearchOutlined />} className="rounded-full max-w-[800px]"
                    />
                </div>
                <div className='header-items' >

                    <Link to='/' className='header-link '>
                        <HomeOutlined className='md:text-2xl text-xl' />
                        <span className='header-link-span'>
                            Ana Sayfa
                        </span>
                    </Link>
                    <Link to="/add-todo" className='header-link'>
                        <FormOutlined className='md:text-2xl text-xl' />
                        <span className='header-link-span '>
                            Not Ekle
                        </span>
                    </Link>
                    <a href="/#" className='header-link'>
                        <LogoutOutlined className='md:text-2xl text-xl' />
                        <span className='header-link-span'>
                            Çıkış
                        </span>

                    </a>



                </div>
            </div>

        </>
    )
}

export default Header