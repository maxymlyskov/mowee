import { useFormikContext } from 'formik';
import React from 'react';


import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'



function AppFormField({name,width, ...otherProps}) {
const {setFieldValue,values, errors, setFieldTouched, touched} = useFormikContext() 
    return (
        <>
            <AppTextInput
                onChangeText={(text)=>setFieldValue(name, text)}
                value={values[name]}
                onBlur={()=> setFieldTouched(name)}
                width={width}
                {...otherProps}

            />

            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormField;