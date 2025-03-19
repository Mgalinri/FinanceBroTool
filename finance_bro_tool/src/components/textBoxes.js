
export default function TextBox(props){
    //This textbox will be used for forms and everything in between
   return <div className="flex flex-col items-center justify-center w-1/2 p-4">
    <label className=" text-secondary font-bold self-start" htmlFor={props.id_}>{props.label}</label>
<input type={props.type} id ={props.id_} placeholder={props.placeholder} className="border w-full  border-gray-300 p-2 rounded-lg" />
    </div>
}