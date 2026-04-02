import React from "react";
import { Button } from "../attoms";

export interface ModalProps extends React.ComponentProps<"dialog"> {
  title: string;
  description?: string;
  btnName?: string;
  btnShow?: boolean;
  onClick?: () => void;
  ref?: React.ForwardedRef<HTMLDialogElement>;
  id?: string;
}
const Modal = ({
  title,
  description,
  onClick,
  btnName,
  btnShow = true,
  ...props
}: ModalProps) => {
  return (
    <dialog className="modal" {...props}>
      <div className="modal-box flex flex-col gap-3 items-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center">{title}</h3>
        {description && <p className="py-4 text-center">{description}</p>}
        {btnShow &&
          (onClick ? (
            <Button className="btn-primary px-5" onClick={onClick}>
              {btnName || "Close"}
            </Button>
          ) : (
            <form method="dialog">
              <Button className="btn-primary px-5"> Close</Button>
            </form>
          ))}
      </div>
    </dialog>
  );
};

export default Modal;
