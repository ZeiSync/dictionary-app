const addMoreMean = () => {
  const modal = document.getElementById('addMean');
  const meanDiv = document.querySelectorAll('.mean-of-word.bg-light.bg-gradient.p-2.mb-3');
  const length = meanDiv.length;
  const div = `
  <div id="${length}" class="mean-of-word bg-light bg-gradient p-2 mb-3">
    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <label class="form-label" for='mean[${length}]'> Mean </label>
        <button type="button" class="btn-close" aria-label="Close" onclick="deleteThisMean(${length})" ></button>
      </div>
        <input id="mean[${length}]" class="form-control" type='text' name='mean[${length}]' required />
    </div>
    <div class="mb-3">
      <label class="form-label" for='example[${length}]'> Example </label>
      <input id="example[${length}]" class="form-control" type='text' name='example[${length}]' required />
    </div>
    <div class="mb-3">
      <label class="form-label" for='situation[${length}]'> Situation </label>
      <input id="situation[${length}]" class="form-control" type='text' name='situation[${length}]' required />
    </div>
  </div>
  `
  modal.insertAdjacentHTML('beforebegin', div);
}

const deleteThisMean = (el) => {
  if (el === 0) {
    return alert('Can\'t remove the last mean');
  }
  document.getElementById(el).remove();
}

const deleteWord = (id) => {
  const onConfirm = confirm("Are you sure delete this word");
  if (onConfirm) {
    window.location.href = `/admin/word/${id}/delete`;
  }
}

window.addEventListener('load', () => {
  addMoreMean();
})