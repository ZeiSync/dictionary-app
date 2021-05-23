const addMoreMean = () => {
  const modal = document.getElementById('addMean');
  const meanDiv = document.querySelectorAll('.border.w-50.p-3.bg-light');
  const length = meanDiv.length;
  const div = `
  <div id="${length}" class="border w-50 p-3 bg-light">
    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <label class="form-label" for='mean[${length}]'> Mean ${length + 1}</label>
        <button type="button" class="btn-close" aria-label="Close" onclick="deleteThisMean(${length})" ></button>
      </div >
      <input id="mean[${length}]" class="form-control" type='text' name='mean[${length}]' required />
    </div >
    <div class="mb-3">
      <label class="form-label" for='example[${length}]'> Example ${length + 1}</label>
      <input id="example[${length}]" class="form-control" type='text' name='example[${length}]' required />
    </div>
    <div class="mb-3">
      <label class="form-label" for='situation[${length}]'> Situation ${length + 1}</label>
      <input id="situation[${length}]" class="form-control" type='text' name='situation[${length}]' required />
    </div>
  </div >
  `
  modal.insertAdjacentHTML('beforeend', div);
}

const deleteThisMean = (id) => {
  if (typeof id === "string") {
    const listMean = document.querySelectorAll('.border.w-50.p-3.bg-light');
    if (listMean.length > 1) {
      const ids = id.split(',');
      const onConfirm = confirm("Are you sure delete this mean of this word");
      if (onConfirm) {
        window.location.href = `/admin/word/${ids[0]}/delete-mean/${ids[1]}`;
      }
    } else {
      alert('Can\'t remove the last mean');
    }
  } else {
    document.getElementById(id).remove();
  }
}