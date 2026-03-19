using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MonProjet.models;
using System.Linq;

namespace MonProjet.controllers;

[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    // stockage en mémoire (simple pour test)
    private static List<Book> books = new List<Book>();
    private static int nextId = 1;

    // 👉 GET all books ( /Book/all )
    [HttpGet("all")]
    public ActionResult<IEnumerable<Book>> GetAllBooks()
    {
        return Ok(books);
    }

    // 👉 GET /Book/1
    [HttpGet("{id}")]
    public ActionResult<Book> GetBookById(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);

        if (book == null)
            return NotFound();

        return Ok(book);
    }

    // 👉 POST /Book
    [HttpPost]
    public ActionResult<Book> AddBook([FromBody] Book book)
    {
        book.Id = nextId++;
        books.Add(book);

        return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
    }

    // 👉 DELETE /Book/1
    [HttpDelete("{id}")]
    public IActionResult RemoveBook(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);

        if (book == null)
            return NotFound();

        books.Remove(book);
        return NoContent();
    }
}