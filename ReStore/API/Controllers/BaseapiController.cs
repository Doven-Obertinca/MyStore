using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Components.RouteAttribute;

namespace API.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseapiController : ControllerBase
    {

    }

    internal class ApiControllerAttribute : Attribute
    {
    }
}