<?php

namespace App\Http\Controllers;

use App\Models\ToDo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ToDosController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $todos = ToDo::where('user_id', $user->id)->get();
        return response()->json($todos);
    }

    public function create()
    {
        return response()->json(['message' => 'todo created successfully']);
    }

    public function saveToDo(Request $request)
    {
        $user = auth()->user();
        
        $todo = new ToDo;
        $todo->name = $request->input('name');
        $todo->description = $request->input('description');
        $todo->user_id = $user->id;
        $todo->save();

        return response()->json(['message' => 'todo created successfully']);
    }

    public function edit(ToDo $todo)
    {
        return Inertia::render('ToDo/Edit', [
            'todo' => $todo,
        ]);
    }

    public function updateToDo(Request $request, $id)
    {
        $todo = ToDo::find($id);
        $todo->name = $request->name;
        $todo->description = $request->description;
        $todo->save();

        return response()->json($todo);
    }

    public function delete($id)
    {
        $todo = ToDo::find($id);
        $todo->delete();
        return response()->json(['message' => 'To-do deleted successfully']);
    }
}
