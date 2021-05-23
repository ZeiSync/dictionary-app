const deleteUser = (id) => {
  const onConfirm = confirm("Are you sure delete this User");
  if (onConfirm) {
    window.location.href = `/admin/user/${id}/delete`;
  }
}