interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export function getFormData(formId: string): FormDataObject {
    const form = document.getElementById(formId) as HTMLFormElement;
    const formData = new FormData(form);
    const data: FormDataObject = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}
