import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Table, Button, Modal, Form, Input, message, Pagination, Select, InputNumber, Upload, Image, DatePicker, TimePicker } from 'antd';
import { NavLink } from 'react-router-dom'
import { useDropzone } from 'react-dropzone';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputMask from 'react-input-mask';

const Blog = ({ placeholder }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [data, setData] = useState([]);
    const [descriptionCkeditor, setdescriptionCkeditor] = useState();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [descriptionModal, setdescriptionModal] = useState(false);
    const [imageUploadModal, setimageUploadModal] = useState(false);
    const [viewImageModal, setviewImageModal] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [DisplayImages, setDisplayImages] = useState([]);
    const [onkeyDisplayImages, setonkeyDisplayImages] = useState([]);
    const [ServicecategoryList, setServiceCategoryList] = useState();

    const AdminUrl = "/Admin"

    const [images, setImages] = useState([]);
    const handleDrop = (acceptedFiles, zoneIndex) => {
        const updatedImages = [...images];
        updatedImages[zoneIndex] = acceptedFiles;
        setImages(updatedImages);
    };

    const renderDropZone = (zoneIndex) => {
        const { getRootProps, getInputProps } = useDropzone({
            accept: {
                'image/png': ['.png', '.jpg', '.jpeg'],
            },
            onDrop: (acceptedFiles) => handleDrop(acceptedFiles, zoneIndex),
        });

        return (
            <div className='w-4/12 m-2'>
                <div {...getRootProps()} className=" p-2 cursor-pointer text-center justify-center border border-gray-200 bg-gray-300 h-48 flex justify-center items-center">
                    <input {...getInputProps()} />
                    <div>
                        <p className="text-center text-5xl">+</p>
                        <p className="text-gray-500">Only upload images in formats such as JPEG, PNG, or GIF.</p>
                    </div>

                </div>
                {images[zoneIndex] && (
                    <div className=" border">
                        {images[zoneIndex].map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Image ${index + 1}`}
                                className="w-32 h-32 object-contain"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleImageUploadModal = async () => {
        const formData = new FormData();
        images.forEach((zoneImages, i) => {
            zoneImages.forEach((data) => {
                formData.append('ids', selectedKey);
                formData.append('images', data);
            });
        });
        await fetch('/uploadBlogsImage', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Upload response:', data);
                if (data.status === 200) {
                    message.success(data.message)
                } else {
                    message.error("Something Went Wrong")
                }
                setImages([])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            width: 200
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            width: 200,
            render: (text, record) => (
                <>
                    <Button onClick={() => handleDescription(record._id)} className="text-white  hover:text-white bg-green-500 border-none hover:bg-green-600">View</Button>
                </>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image',
            width: 250,
            render: (text, record) => (
                <>
                    <Button onClick={() => handleImageUpload(record._id)} className="text-white  hover:text-white bg-green-500 border-none hover:bg-green-600">Upload Image</Button>
                    <Button onClick={() => viewImage(record._id)} className="text-white m-1 hover:text-white bg-blue-500 border-none hover:bg-blue-600">View</Button>
                </>
            ),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 100
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleUpdate(record._id)} className="text-white bg-green-500 border-none hover:bg-green-600 hover:text-white ">Edit</Button>
                    <Button onClick={() => handleDelete(record._id)} className="text-white bg-red-500 border-none hover:bg-red-500 hover:text-white ml-2">Delete</Button>
                </>
            ),
        },
    ];

    const [form] = Form.useForm();
    const pageSize = 5;

    useEffect(() => {
        const callServices = async () => {
            try {
                const req = await fetch('/getAllBlogs', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => response.json())
                    .then(jsonData => {
                        // console.log(jsonData);
                        setData(jsonData);
                        setLoading(false);
                    }).catch(error => console.error(error))

            } catch (error) {
                console.log(error);
            }
        }
        callServices();
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    function handleCreate() {
        form.resetFields();
        setdescriptionCkeditor('');
        setModalVisible(true);
        setSelectedKey(null);
    }

    function handleDescription(key) {
        const selectedRow = data.find(item => item._id === key);
        setdescriptionCkeditor(selectedRow.content);
        setSelectedKey(key);
        setdescriptionModal(true);
    }

    function cancelDescriptionModal() {
        setdescriptionModal(false);
    }

    function handleUpdate(key) {
        const selectedRow = data.find(item => item._id === key);
        form.setFieldsValue(selectedRow);
        setdescriptionCkeditor(selectedRow.content);
        setModalVisible(true);
        setSelectedKey(key);
    }

    function viewImage(key) {
        setSelectedKey(key);
        const callServices = async () => {
            try {
                const req = await fetch('/getAllBlogs', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => response.json())
                    .then(jsonData => {
                        setData(jsonData);
                        setLoading(false);
                        console.log(jsonData);

                        const imgOBJ = {}
                        jsonData.map(obj => {
                            const { image } = obj;
                            imgOBJ[obj._id] = { image }
                        });

                        // Set the filtered images in the displayImages state
                        const filteredImages = imgOBJ[key] || [];
                        setonkeyDisplayImages(filteredImages)
                        setDisplayImages(imgOBJ);
                        setviewImageModal(true);
                    }).catch(error => console.error(error))

            } catch (error) {
                console.log(error);
            }
        }
        callServices();


    }

    const CancelViewModal = () => {
        setviewImageModal(false);
    };

    function handleDelete(key) {
        setSelectedKey(key);
        setDeleteModalVisible(true);
        // setData(data.filter(item => item.key !== key));
    }

    const handleDeleteModalOk = () => {
        setData(data.filter((item) => item._id !== selectedKey));
        setDeleteModalVisible(false);
        const DeleteBlog = async () => {
            try {
                const res = await fetch("/delete_blog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        selectedKey
                    })
                })
                const data = await res.json();
                if (data.status === 200) {
                    message.success("Blog Deleted Successfully")
                } else {
                    message.error("Something Went Wrong")
                }
            } catch (error) {
                console.log(error)
            }
        }
        // Caling Del Blog Function
        DeleteBlog();

    };

    const handleDeleteModalCancel = () => {
        setDeleteModalVisible(false);
    };

    function handleImageUpload(key) {
        setSelectedKey(key);
        setimageUploadModal(true);
    }

    const handleCancelImageUploadModal = () => {
        setimageUploadModal(false);
    };

    function handleSave() {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                setModalVisible(false);
                if (selectedKey === null) {
                    setData([
                        ...data,
                        {
                            _id: data.length + 1,
                            ...values,
                        },
                    ]);

                    const addBlog = async () => {
                        try {
                            const res = await fetch("/add_blog", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    values, descriptionCkeditor
                                })
                            })

                            const datas = await res.json();
                            // console.log(data)
                            if (datas.status === 200) {
                                message.success("Blog Added Successfully")
                            } else {
                                message.error("Something Went Wrong")
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    // Caling Add Blog Function
                    addBlog();

                } else {
                    console.log(descriptionCkeditor);
                    setData(
                        data.map(item =>
                            item._id === selectedKey ? { ...item, ...values } : item
                        )
                    );
                    // Update Blog Request 
                    const updateBlog = async () => {
                        try {
                            const res = await fetch("/update_blog", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    selectedKey, values, descriptionCkeditor
                                })
                            })

                            const data = await res.json();
                            // console.log(data)
                            if (data.status === 200) {
                                message.success("Blog Updated Successfully")
                            } else {
                                message.error("Something Went Wrong")
                            }

                        } catch (error) {
                            console.log(error)
                        }
                    }

                    // Caling Add Blog Function
                    updateBlog();
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    function ImageDisplay({ images }) {
        return (
            <div className='mt-5'>
                <h1 className='font-bold text-lg'>Body Image:</h1>
                {

                    images.image === '' || images?.image === undefined ? <p>No Image Found</p> :

                        <div id="imageBlog" className='overflow-hidden m-1 relative'>
                            <img className='ml-2 border p-2 w-full h-full object-contain' src={`/uploads/blog/${images?.image}`} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute top-0 right-0 m-1 cursor-pointer bg-red-500 rounded-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                onClick={() => handleDeleteBlog(images?.image)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                }
            </div>
        );
    }

    const handleDeleteBlog = async (imageUrl) => {
        try {
          // Send a request to the backend to delete the image from MongoDB
          const response = await fetch('/deleteBlogImage', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl, selectedKey }),
          });
      
          if (response.ok) {
            // Image deleted successfully, perform any necessary UI updates
            console.log('Image deleted successfully');
            message.success("Image deleted successfully")
            document.getElementById('imageBlog').style.display = 'none'
          } else {
            // Handle error response from the backend
            console.log('Error deleting image');
          }
        } catch (error) {
          // Handle any network or server errors
          console.log('Error deleting image:', error);
        }
      };
      
    useEffect(() => {
        ClassicEditor.create(document.querySelector('#editor-root'))
            .then(editor => {
                console.log('Editor successfully initialized', editor);
            })
            .catch(error => {
                console.error('Error initializing editor:', error);
            });
    }, []);
    return (
        <main>
            <div className="mx-auto p-5 mt-10">
                <h1 className='text-4xl text-gray-300 font-bold mb-2'>Blogs</h1>
                <nav aria-label="Breadcrumbs" className="order-first flex text-sm font-semibold sm:space-x-2">
                    <NavLink to={`${AdminUrl}`}>
                        <a href="" className="hover:text-slate-600 hidden text-slate-500 sm:block" >Home</a>
                    </NavLink>


                    <div aria-hidden="true" className="hidden select-none text-slate-400 sm:block">/</div>
                    <p className="text-slate-500 hover:text-slate-600">Manage Blogs</p>
                </nav>
                {
                    Loading ? "Table Loading" :
                        <>
                            <div className='flex justify-center'>
                                <Button onClick={handleCreate} className="text-gray-300">Add New Blog</Button>
                            </div>
                            <div className='table-responsive overflow-hidden overflow-x-auto'>
                                <Table columns={columns}
                                    dataSource={data?.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                                    pagination={false}
                                    className="w-full mt-10"
                                    rowClassName="dark:bg-secondary-dark-bg  no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300" />

                                <div className="mt-4">
                                    <Pagination
                                        current={currentPage}
                                        onChange={handlePageChange}
                                        pageSize={pageSize}
                                        total={data?.length}
                                    />
                                </div>
                            </div>
                            <Modal
                                title={selectedKey === null ? 'Create Blog' : 'Update Blog'}
                                visible={modalVisible}
                                onOk={handleSave}
                                onCancel={() => setModalVisible(false)}
                                okButtonProps={{ disabled: false }}
                            >
                                <Form form={form} className="mt-2">
                                    <Form.Item name="title" label="title" rules={[{ required: true, message: 'Please enter Blog Title' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="content" label="content">
                                        <div id="editor-root">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={descriptionCkeditor}

                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setdescriptionCkeditor(data)
                                                }}
                                                onBlur={(event, editor) => {
                                                    console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    console.log('Focus.', editor);
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        name="tags"
                                        label="Tags"
                                        rules={[{ required: true, message: 'Please enter tags' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal
                                title="Confirm Delete"
                                visible={deleteModalVisible}
                                onOk={handleDeleteModalOk}
                                onCancel={handleDeleteModalCancel}
                            >
                                <p>Are you sure you want to delete this row?</p>
                            </Modal>

                            <Modal
                                title="Image Upload"
                                visible={imageUploadModal}
                                onOk={handleImageUploadModal}
                                onCancel={handleCancelImageUploadModal}
                                okText="Upload"
                            >
                                <div className='flex flex-wrap justify-center'>
                                    {renderDropZone(0)}

                                </div>
                            </Modal>

                            <Modal
                                title={`List of Images - ${selectedKey}`}
                                visible={viewImageModal}
                                onOk={''}
                                onCancel={CancelViewModal}
                            >
                                <ImageDisplay images={onkeyDisplayImages} />
                            </Modal>

                            {/* Description View  */}
                            <Modal
                                title={`Description - ${selectedKey}`}
                                visible={descriptionModal}
                                onCancel={cancelDescriptionModal}
                            >
                                <div dangerouslySetInnerHTML={{ __html: descriptionCkeditor }} className="mt-10"></div>
                            </Modal>
                        </>
                }
            </div>
        </main>
    )
}

export default Blog