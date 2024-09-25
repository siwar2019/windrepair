import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type FormProviderProps = {
    children: React.ReactNode
    methods: UseFormReturn<any>
    onSubmit?: VoidFunction
    onReset?: VoidFunction
}

const FormProvider = ({ children, onSubmit, onReset, methods }: FormProviderProps) => {
    return (
        <Form {...methods}>
            <form onReset={onReset} onSubmit={onSubmit}>
                {children}
            </form>
        </Form>
    )
}

export default FormProvider
