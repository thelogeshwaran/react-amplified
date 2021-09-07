import { TodoStore } from "./Store";

export const setupRootStore = () =>{
    const rootTree = TodoStore.create({
        todos : []
    })

    return { rootTree }
}