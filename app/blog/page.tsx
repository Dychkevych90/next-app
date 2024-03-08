import {serverClient} from "@/client";
import AddPostDialog from "@/components/addPostDialog";

 const  Blog = async () => {
   const todos = await serverClient.postList();
 
  return(
    <>
      <h1>Blog Page</h1>
      {
        todos.map((item) => {
          return (
            <div key={item.id}>{item?.title}{item?.desc}</div>
          )
        })
      }
    </>
  )
}

export default Blog

