import toast from "react-hot-toast";

let EmailRegx =/\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value) {
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return EmailRegx.test(value);
    }

    ErrorToast(msg) {
        toast.error(msg)
    }

    SuccessToast(msg) {
        toast.success(msg)
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }
}
export const {
    IsEmpty,
    IsMobile,
    IsEmail,
    ErrorToast,
    SuccessToast,
    getBase64
} = new FormHelper()
