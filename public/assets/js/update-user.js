const removeWordFromList = (id) => {
  const ids = id.split(',');
  const onConfirm = confirm("Are you sure remove this WORD from this user");
  if (onConfirm) {
    window.location.href = `/admin/user/${ids[0]}/delete-word/${ids[1]}`;
  }
}
