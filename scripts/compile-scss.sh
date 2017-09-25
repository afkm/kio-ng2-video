#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
MODULE_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

SASS_BIN="${MODULE_ROOT}/node_modules/.bin/node-sass"

SOURCE_DIR="${1:-}"

if [[ ${#} -lt "1" ]]; then
  printf '%s\n' "more args needed"
  exit 1
elif [[ -d "${SOURCE_DIR}" ]]; then
  shift
  SOURCE_DIR="$(cd "${SOURCE_DIR}"; pwd)"
else
  printf '%s\n' "invalid arg; should be a folder"
  exit 2
fi


function compile_sass () {
  local filename="${1}"
  shift

  local filename_dir="$(dirname "${filename}")"
  local filename_base="$(basename "${filename}" ".scss")"

  local target_dir="$(cd "${filename_dir}"; pwd)"

  "${SASS_BIN}" "${filename}" > "${target_dir}/${filename_base}.css"
}

function replace_in_file () {
  local target_file="${1}"
  local tmp_file="${target_file}.$RANDOM"

  sed 's/.scss/.css/g' "${target_file}" > "${tmp_file}"
  rm "${target_file}"
  mv "${tmp_file}" "${target_file}"
}

function replace_file_references () {
  cd "${SOURCE_DIR}"
  for filename in `find . -name "*.ts"`; do
    #printf 'replace scss references in %s\n' "${filename}"
    replace_in_file "${filename}"
  done  
}


SCSS_FILES=`cd "${SOURCE_DIR}"; find . -name *.scss`

for SCSS_FILE in ${SCSS_FILES[@]}; do

  printf '\x1b[1;32m%s\x1b[0m %s\n' "Compile SASS file" "${SCSS_FILE}"
  compile_sass "${SOURCE_DIR}/${SCSS_FILE}"
  rm "${SOURCE_DIR}/${SCSS_FILE}"
done

replace_file_references