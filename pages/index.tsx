import type {GetStaticProps, NextPage, NextPageContext} from 'next'
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";


// export const getStaticProps: GetStaticProps = async (context) => {
//     const res = await fetch('http://localhost:8888/get')
//     const todos = await res.json()
//     console.log(todos)
//     return {
//         props: {
//             todos,
//         },
//     }
// };

interface IBTodoProps {
    todos: Array<Todo>
}


interface Todo {
    title: string,
    isOver: boolean
}





interface IBSetTodos {
    (newOne: Todo[]): void
}






// const Home = ({todos}: IBTodoProps) => {
const Home = () => {

    const addTodo = (title: string) => {
        axios.post('http://localhost:8888/a', {
            title: title,
        })
            .then(function (response) {
                setTodos(response.data)
                return response.data;

            })
            .catch(function (error) {
                return error;
            });
    }

    const fetchData = async () => {
        const result = await axios(
            'http://localhost:8888/get',
        );

        setTodos(result.data);
    }; const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input: HTMLInputElement = event.currentTarget
        // if (event)
        if (event.key === 'Enter') {
            addTodo(input.value);
            input.value = ''
        }
    }

    const handleClick = async (event: React.MouseEvent<HTMLInputElement>) => {
        const checkBox: HTMLInputElement = event.currentTarget;
        // checkBox.checked = checkBox.checked
        // checkBox.click()
        const data = JSON.stringify({
            title: checkBox.value
        })
        console.log(data)

        axios.post('http://localhost:8888/u', {
            title: checkBox.value,
            isOver: checkBox.checked
        })
            .then(function (response) {
                console.log('click end', response.data)
                setTodos(response.data)
                return response;
            })
            .catch(function (error) {
                return error;
            });
        console.log()
    };


    const [todos, setTodos] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8888/get',
            );

            setTodos(result.data);
        };
        fetchData();
    }, []);
    return (

        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">

                    <div className="rounded-md shadow-sm -space-y-px">
                        {todos.map(({title, isOver}) => !isOver?
                            (
                                <div key={title + "1"} className="block w-full px-3 py-2 border rounded-t-md">

                                    <p>
                                        <input type="checkbox"  onClick={handleClick}
                                               className="border-gray-300 rounded "
                                               id="cbox1" value={title}/>
                                        <label className={"ml-3"} htmlFor="cbox1">{title}</label>
                                    </p>
                                </div>
                            ): (
                                ''
                            )
                        )}
                        <div>
                            <input
                                id="new"
                                name="new"
                                type="text"
                                onKeyUp={handleKeyUp}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                                     border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                                      focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Add a new todo..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home
