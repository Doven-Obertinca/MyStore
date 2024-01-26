using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging; // Added for ILogger

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly ILogger<BasketController> _logger; // Added ILogger

    public BasketController(StoreContext context, ILogger<BasketController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) return NotFound();

        return basket.MapBasketToDto();
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity = 1)
    {
        //get basket
        var basket = await RetrieveBasket(GetBuyerId());
        //create basket
        if (basket == null) basket = CreateBasket();
        //get product
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
        //add item
        basket.AddItem(product, quantity);
        //save changes
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    // private object MapBasketToDto(Basket basket)
    // {
    //     throw new NotImplementedException();
    // }

    // private Basket RetrieveBasket()
    // {
    //     throw new NotImplementedException();
    // }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)
    {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) return NotFound();

        basket.RemoveItem(productId, quantity);

        // Simplified the condition using if statement
        if (await _context.SaveChangesAsync() > 0)
            return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
        if (string.IsNullOrEmpty(buyerId))
        {
            Response.Cookies.Delete("buyerId");
            return null;
        }

        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
    }

    private string GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

    private Basket CreateBasket()
    {
        // Simplified assignment using ?? operator
        var buyerId = User.Identity?.Name ?? Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        var basket = new Basket { BuyerId = buyerId };
        _context.Baskets.Add(basket);
        return basket;
    }
}

