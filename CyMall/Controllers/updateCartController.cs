using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CyMall.Controllers
{
    public class updateCartController : ApiController
    {

        public void post(int id)
        {
            using (CyMallEntities1 entities = new CyMallEntities1())
            {
                var entity = entities.carts.First(e => e.product_id == id);
                    entity.quantity = entity.quantity + 1;
                    entities.SaveChanges();
                
            }
        }
    }
}
