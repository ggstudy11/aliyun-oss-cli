# aliyun-oss-cli

[![License](https://img.shields.io/github/license/ggstudy11/aliyun-oss-cli.svg?style=flat-square)](LICENSE)

**阿里云 OSS（对象存储服务）命令行工具**，基于 Node.js 开发，支持通过终端快速操作 OSS 存储桶、文件上传/下载等功能。

## 🚀 核心功能

- 存储桶（Bucket）管理
  - ✅ 查看存储桶列表
  - ❌ 创建存储桶
  - ❌ 删除存储桶
- 文件操作
  - ✅ 上传文件
  - ❌ 删除文件
  - ❌ 下载文件
  - ❌ 查看文件列表
- ❌ 权限控制：设置文件访问权限（公共读/私有等）
- ✅ 命令行交互：支持参数配置与交互式引导
- ✅ 多区域支持：适配阿里云 OSS 各数据中心

> ✅：已实现  
> ❌：未实现但预期未来实现

## 📦 安装方式

```bash
git clone https://github.com/ggstudy11/aliyun-oss-cli.git
cd aliyun-oss-cli
npm install
## 启动项目
npm start
```

## 🔧 快速开始

配置阿里云凭证
首次使用需配置 AccessKey ID 和 AccessKey Secret：

```bash
oss-cli > set
# 按提示输入阿里云账号信息
```

## 常用命令示例

### 存储桶列表

```bash
oss-cli > list
```

### 上传文件

```bash
oss-cli > upload <fileUrl>
```

## 📖 完整命令列表

| 命令分类   | 命令名称   | 说明                  |
| ---------- | ---------- | --------------------- |
| 配置管理   | `set`      | 初始化/修改阿里云凭证 |
| 存储桶管理 | `create`   | 创建存储桶            |
|            | `list`     | 查看存储桶列表        |
|            | `delete`   | 删除存储桶            |
| 文件操作   | `upload`   | 上传文件/目录         |
|            | `download` | 下载文件              |
|            | `delete`   | 删除文件              |
|            | `list`     | 列出文件列表          |

## 克隆项目

git clone https://github.com/ggstudy11/aliyun-oss-cli.git

## 安装依赖

npm install

## 代码结构

```
src/
├─ commands/          # 命令模块
├─ utils/             # 工具函数
├─ config.js           # 配置管理逻辑
└─ index.js           # 命令行入口
test/                 # 测试用例
package.json          # 依赖与脚本配置
LICENSE               # 开源协议文件
```

## 📜 许可证

本项目采用 MIT 许可证，允许商业使用、修改和再发布，但需保留原作者声明。

## ❓ 问题反馈

Issue：https://github.com/ggstudy11/aliyun-oss-cli/issues  
Contact me：📮: 2251338@tongji.edu.cn
