'use client'
import { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

const Navbar = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

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
        { key: '/', label: <Link href="/">Blog Post</Link> },
        { key: '/users', label: <Link href="/users">Users</Link> },
    ];

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid #e8e8e8' }}>
                <strong style={{ margin: '16px 24px 16px 0', float: 'left' }}>Synapsis</strong>
                {!isMobile ? (
                    <Menu mode="horizontal" selectedKeys={[pathname]} style={{ lineHeight: '64px', backgroundColor: 'white' }} items={menuItems} />
                ) : (
                    <MenuOutlined style={{ fontSize: '24px', cursor: 'pointer', color: 'black' }} onClick={toggleDrawer} />
                )}
            </Header>
            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={toggleDrawer}
                open={drawerVisible}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[pathname]}
                    onClick={() => setDrawerVisible(false)}
                    style={{ backgroundColor: 'white' }}
                    items={menuItems}
                />
            </Drawer>
        </Layout>
    );
};

export default Navbar;
