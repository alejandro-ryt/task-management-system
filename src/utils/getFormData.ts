interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export function getFormData(form: HTMLFormElement): FormDataObject {
    const formData = new FormData(form);
    const data: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
}
