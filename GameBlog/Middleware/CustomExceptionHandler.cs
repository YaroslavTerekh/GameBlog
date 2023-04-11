using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;

namespace GameBlog.Middleware;

public class CustomExceptionHandler
{
    private readonly RequestDelegate _next;

    public CustomExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exc)
        {
            await HandleException(exc, context);
        }
    }

    private Task HandleException(Exception exception, HttpContext context)
    {
        var response = String.Empty;
        var error = new { code = 500, response = "Bad request" };

        error = exception switch
        {
            ValidationException validationException =>
                error = new
                {
                    code = (int)HttpStatusCode.BadRequest,
                    response = validationException.Message
                },

            ArgumentException argumentException =>
               error = new
               {
                   code = (int)HttpStatusCode.BadRequest,
                   response = argumentException.Message
               },

            BadHttpRequestException badHttpRequestException =>
               error = new
               {
                   code = (int)HttpStatusCode.BadRequest,
                   response = badHttpRequestException.Message
               },

            Exception exc =>
             error = new
             {
                 code = (int)HttpStatusCode.BadRequest,
                 response = exc.Message
             },

            _ =>
                error = new
                {
                    code = (int)HttpStatusCode.BadRequest,
                    response = "Щось пішло не так"
                },
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = error.code;

        response = JsonSerializer.Serialize(error);

        return context.Response.WriteAsync(response);
    }
}
