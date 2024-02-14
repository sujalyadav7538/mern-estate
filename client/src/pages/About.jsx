/* eslint-disable no-unused-vars */
export default function About() {
  const checkPrompt=(e)=>{
      return (confirm('Do youb want to delete your account!'))
  }
  
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center"><button className=" bg-red-800 m-4 p-8  " onClick={checkPrompt}>Delete</button></div>
  )
}
