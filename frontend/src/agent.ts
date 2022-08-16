const BREV_URL = "https://8080-todo-template-js-q3aa-georgia-education.wgt-us-west-2-test.brev.dev"

export interface TodoType {
    id: string;
    title: string;
    isComplete: boolean;
}


export const GetTodos = async () => {
    let response = await fetch(BREV_URL, {
        method: "GET"
    });
    return await response.json() as TodoType[];
}

export const CreateTodo = async (newTitle: string) => {
    let response = await fetch(BREV_URL, {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            title: newTitle,
            isComplete: false
        })
    });
    await console.log(response)
    return await response.json();
}


export const ModifyTodo = async (id: string) => {
    let response = await fetch(BREV_URL+`?id=${id}`, {
        method: "PUT"
    })
    return await response.json();
}