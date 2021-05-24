import Layout from "../../components/layout";
import Link from "next/link";
import { dataProvider } from "../../services/dataProvider";
import pagination from "../../services/pagination";
import ProductBox from "../../components/ui/productbox";

const Web = props => {
  return (
    <Layout
      title="Build your projects on the Cloud"
      desc="Cloud services to help you build your next project "
    >
      <div className="hero-build">
        <span className="badge">Build</span>
        <h1>Cloud Services</h1>
        
      </div>
      <div className="frame-def">
        {props.items.map(item => (
          <ProductBox item={item} />
        ))}
      </div>
      <div className="pages">
        {props.tabPages.map(page => (
          <Link href={{ pathname: "", query: { type: "cloud", p: page } }}>
            <a key={page}>{page}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

Web.getInitialProps = async function(context) {
  var { p } = context.query;
  var { type } = context.query;

  let provider = new dataProvider();
  let paginator = new pagination();

  if (!type) {
    var result = provider.getByTags("cloud", p ? p : 0);
  } else {
    var result = provider.getBy("cloud", p ? p : 0, type);
  }

  let pages = paginator.paginateBy(result.nbr, 9);

  // Return to render
  return {
    items: result.result.map(entry => entry),
    pageNbr: p,
    tabPages: pages,
    type: type
  };
};

export default Web;
