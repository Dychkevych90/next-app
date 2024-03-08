import {serverClient} from "@/client";

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