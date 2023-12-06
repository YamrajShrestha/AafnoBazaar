"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);
const Home = () => (
  <div className="con">
  <div className="flex">
    <Image
      src="/logo.png"
      width={120}
      height={100}
      alt="Picture of the author"
    />
<nav>
  <ul className="flex">
    <li>
      <Link href='/login'>Login</Link>
    </li>
    <li>
      <Link href='/register'>Register</Link>
    </li>
  </ul>
</nav>
<Search
      placeholder="Search here..."
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
  </div>
  </div>
);

export default Home;
