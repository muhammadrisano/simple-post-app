"use client"
import * as React from "react";

import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
  type ControllerProps
} from "react-hook-form";

import { cn } from "@/utils/cn";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};
const FormFieldContext = React.createContext({} as FormFieldContextValue);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);


const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext value = {{ name: props.name }}>
        <Controller {...props} />
    </FormFieldContext>
  )
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext); 
    const {getFieldState} = useFormContext()
    const formState = useFormState({name: fieldContext.name})
    const fieldState = getFieldState(fieldContext.name, formState)

    if(!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const {id} = itemContext
    const formItemId = `${id}-form-item`
    const formDescriptionId = `${id}-form-item-description`
    const formMessageId = `${id}-form-item-message`
    return {
        id,
        name: fieldContext.name,
        formItemId,
        formDescriptionId,
        formMessageId,
        ...fieldState
    }
}


const FormItem = ({className, children}: React.ComponentProps<"div">)=>{
    const id = React.useId()
    return (
        <FormItemContext value={{id}}>
          <div className={cn("grid gap-2", className)}>
            {children}
          </div>
        </FormItemContext>
    )
}

const FormControl = ({...props}:React.ComponentProps<"div">)=>{
    const {error, formItemId, formDescriptionId, formMessageId} = useFormField()
    return (
        <div
            id={formItemId}
            aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            {...props}
        />
    )
}

const FormDescription = ({className, ...props}: React.ComponentProps<"p">) => {
    const {formDescriptionId} = useFormField()
    return (
        <p id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
}

const FormMessage = ({className, ...props}: React.ComponentProps<"p">) => {
    const {error, formMessageId} = useFormField();
    const body = error ? String(error?.message ?? "") : props.children
    return (
        <p id={formMessageId} className={cn("text-xs font-medium text-red-600", className)} {...props} >
            {body}
        </p>
    )
}

export {
    useFormField,
    Form,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
    FormField
}