class ApiError extends Error{
    constructor(
        stauscode,
        message="Something wend wrong",
        error = [],
        stack =""
    ){
        super(message)
        this.stauscode = stauscode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.error = error

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}