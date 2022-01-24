using System.Threading.Tasks;
using Statiq.App;
using Statiq.Common;
using Statiq.Web;

namespace TechWatching
{
    public class Program
    {
        public static async Task<int> Main(string[] args) =>
            await Bootstrapper
                .Factory
                .CreateWeb(args)
                .DeployToNetlify(Config.FromSetting<string>("NetlifySiteId"), Config.FromSetting<string>("NetlifyAccessToken"))
                .RunAsync();
    }
}