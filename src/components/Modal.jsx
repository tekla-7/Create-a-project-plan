import { createPortal } from "react-dom";
import { forwardRef ,useImperativeHandle ,useRef} from "react";
import Button from "./Button";
const Modal= forwardRef(function Modal({ children , buttonText } ,ref) {
    const dialog=useRef()
    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal()
            }
        }
    })
  return createPortal(
    <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" ref={dialog}>
      {children}
      <form method='dialog' className="mt-4 text-right">
        <Button >{buttonText}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
})
export default Modal