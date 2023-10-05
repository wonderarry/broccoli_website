const submitValidator = (status) => {
    return status === 201 || status === 409;
}
export default submitValidator;