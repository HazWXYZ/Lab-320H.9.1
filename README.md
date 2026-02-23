# React Todo App for RLAB

## How to use: use the "npm run dev" command in the terminal then follow the localhost link.

## useReducer handles all the todo state (add, delete, toggle, edit) — the lab specifically asks for this
## useState is used inside TodoItem for the local edit mode (text input value + whether editing is active), which is the right call since it's per-item UI state
## Delete is disabled unless the todo is checked ✓
## While editing, only a Save button shows (Edit/Delete are hidden) ✓
## New todos go to the top ✓
## Enter key works on both the add input and edit input