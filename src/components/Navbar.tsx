'use client'
import { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

const Navbar = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const menuItems = [
        { key: 'blog', label: 'Blog Post', href: '/' },
        { key: 'user', label: 'Users', href: '/users' },
    ];

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid #e8e8e8' }}>
                <div style={{ width: '120px', height: '31px', background: 'rgba(0, 0, 0, 0.2)', margin: '16px 24px 16px 0', float: 'left' }} />
                {!isMobile ? (
                    <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px', backgroundColor: 'white' }}>
                        {menuItems.map(item => (
                            <Menu.Item key={item.key} style={{ color: 'black' }}>
                                <Link href={item.href}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                ) : (
                    <MenuOutlined style={{ fontSize: '24px', cursor: 'pointer', color: 'black' }} onClick={toggleDrawer} />
                )}
            </Header>
            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={toggleDrawer}
                visible={drawerVisible}
                drawerStyle={{ backgroundColor: 'white' }}
            >
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={['home']}
                    onClick={() => setDrawerVisible(false)}
                    style={{ backgroundColor: 'white' }}
                >
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} style={{ color: 'black' }}>
                            <Link href={item.href}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Drawer>
        </Layout>
    );
};

export default Navbar;
