<?php

namespace App\Http\Controllers\auth;

use App\Models\ToDo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function index()
    {
        $todos = ToDo::all();

        return Inertia::render('ToDo/Index', [
            'todos' => $todos,
        ]);
    }

    public function create()
    {
        return Inertia::render('ToDo/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $todo = new ToDo;
        $todo->name = $request->name;
        $todo->save();

        return redirect()->route('todos.index');
    }

    public function edit(ToDo $todo)
    {
        return Inertia::render('ToDo/Edit', [
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, ToDo $todo)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $todo->name = $request->name;
        $todo->save();

        return redirect()->route('todos.index');
    }

    public function destroy(ToDo $todo)
    {
        $todo->delete();

        return redirect()->route('todos.index');
    }
}
