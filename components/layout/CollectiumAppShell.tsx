import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumTopbar } from "./CollectiumTopbar";

export function CollectiumAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="ct-shell">
      <CollectiumTopbar />

      <div className="ct-shell-body">
        <CollectiumSidebar />
        <main className="ct-main">{children}</main>
      </div>
    </div>
  );
}

export default CollectiumAppShell;
