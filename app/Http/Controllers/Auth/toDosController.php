<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class toDosController extends Controller

{
    public function index()
    {
        $todolists = Todolist::all();

        return view('todolists.index', compact('todolists'));
    }

    public function create()
    {
        return view('todolists.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $todolist = new Todolist;
        $todolist->name = $request->name;
        $todolist->save();

        return redirect()->route('todolists.index');
    }

    public function edit(Todolist $todolist)
    {
        return view('todolists.edit', compact('todolist'));
    }

    public function update(Request $request, Todolist $todolist)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $todolist->name = $request->name;
        $todolist->save();

        return redirect()->route('todolists.index');
    }

    public function destroy(Todolist $todolist)
    {
        $todolist->delete();

        return redirect()->route('todolists.index');
    }
}

